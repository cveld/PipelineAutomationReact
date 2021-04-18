import * as SDK from "azure-devops-extension-sdk";
import { ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
import { localeIgnoreCaseComparer } from "azure-devops-ui/Core/Util/String";
import { ListSelection } from "azure-devops-ui/List";
import { IListBoxItem } from "azure-devops-ui/ListBox";

import React from "react";
import "./First.scss";
import { CommonServiceIds, getClient, IExtensionDataManager, IExtensionDataService, IProjectPageService } from "azure-devops-extension-api";
import { IWorkItemFormNavigationService, WorkItemTrackingRestClient, WorkItemTrackingServiceIds } from "azure-devops-extension-api/WorkItemTracking";
import ReactJson from "react-json-view";

import template from "./First.template";
import { FirstState } from "./FirstState.interface";
import { CommonServices } from "../Common/azure-devops-ui";


export class First extends React.Component<{}, FirstState> {
    private tokenValue = new ObservableValue("");
    public workItemIdValue = new ObservableValue("1");
    public workItemTypeValue = new ObservableValue("Bug");
    public selection = new ListSelection();
    public workItemTypes = new ObservableArray<IListBoxItem<string>>();
    private items = new ObservableArray<string>();

    constructor(props: {}) {
        super(props);

        this.state = {
            token: "",
            items: ["first"],
            expanded: false
        };  
    }

    public componentDidMount() {
        console.log('i am here');
        SDK.init();
        this.loadWorkItemTypes();
        this.doSomeAsyncStuff();
    }

    public render(): JSX.Element {
        return template.call(this);
    }

    public async onListAllDocumentsClick(): Promise<void> {
        // taken from https://docs.microsoft.com/en-us/azure/devops/extend/develop/data-storage?view=azure-devops
        // Get data service
        const dataManager = await CommonServices.getExtensionDataManager();
        // Get all document under the collection
        try {
            let docs = await dataManager.getDocuments("MyCollection");
            console.log("There are " + docs.length + " in the 'MyCollection' collection.");        
        }
        catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`);
        }
        let docs = await dataManager.getDocuments("$settings", {scopeType: "User"});
        console.log("There are " + docs.length + " in the $settings collection.");        
        console.log(docs);
    }

    

    // taken from Hub -> ExtensionDataTab.tsx example
    public async onAddDataClick(): Promise<void> {
        const dataManager = await CommonServices.getExtensionDataManager();
        const result = await dataManager.setValue("userScopedKey", 12345, {scopeType: "User"});
        this.setState(oldState => ({
            items: [...oldState.items, "12345"]
        }));
        console.log("User scoped key value is " + result);
    }

    private async doSomeAsyncStuff(): Promise<void> {
        const token = await SDK.getAccessToken();
        this.setState({
            token: token
        });
        //this.forceUpdate();
    }

    private async loadWorkItemTypes(): Promise<void> {
        // @ts-ignore 
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();

        let workItemTypeNames: string[];

        if (!project) {
            workItemTypeNames = [ "Issue" ];
        }
        else {
            const client = getClient(WorkItemTrackingRestClient);
            const types = await client.getWorkItemTypes(project.name);
            workItemTypeNames = types.map(t => t.name);
            workItemTypeNames.sort((a, b) => localeIgnoreCaseComparer(a, b));
        }

        this.workItemTypes.push(...workItemTypeNames.map(t => { return { id: t, data: t, text: t } }));
        this.selection.select(0);
    }

    public async onOpenExistingWorkItemClick() {
        const navSvc = await SDK.getService<IWorkItemFormNavigationService>(WorkItemTrackingServiceIds.WorkItemFormNavigationService);
        navSvc.openWorkItem(parseInt(this.workItemIdValue.value));
    };

    public async onOpenNewWorkItemClick() {
        const navSvc = await SDK.getService<IWorkItemFormNavigationService>(WorkItemTrackingServiceIds.WorkItemFormNavigationService);
        navSvc.openNewWorkItem(this.workItemTypeValue.value, { 
            Title: "Opened a work item from the Work Item Nav Service",
            Tags: "extension;wit-service",
            priority: 1,
            "System.AssignedTo": SDK.getUser().name,
         });
    };
}