import { ObservableArray } from "azure-devops-ui/Core/Observable";
import { ITableColumn, ITableRow, renderSimpleCell } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { bind } from "bind-decorator";
import React from "react";
import { AddPipelineContextPanel, IAddPipelineContextPanelResult } from "./AddPipelineContextPanel";
import { IPipelineAutomationProps, IPipelineAutomationState } from "./PipelineAutomation.interfaces";
import * as SDK from "azure-devops-extension-sdk";
import template from "./PipelineAutomation.template";
import { IExtensionDataManager, IProjectInfo, IProjectPageService } from "azure-devops-extension-api";
import { PipelineContextDetails } from "./PipelineContextDetails";
import { CommonServices } from "../Common/azure-devops-ui";

export class PipelineAutomation extends React.Component<IPipelineAutomationProps, IPipelineAutomationState> {
    constructor(props: IPipelineAutomationProps) {
        super(props);

        this.state = {
            AddPipelineContextPanelVisible: false,            
        };  
    }
    Items = new ObservableArray<PipelineContextDetails>([]);
    columns : ITableColumn<any>[] = [{
        id: "PipelineId",
        name: "Pipeline Id",
        renderCell: renderSimpleCell,
        width: 200
    },
    {
        id: "Branch",
        name: "Branch",
        renderCell: renderSimpleCell,
        width: 300
    }];

    public componentDidMount() {
        SDK.init();
        this.initializeComponent();
    }

    dataManager?: IExtensionDataManager;
    project?: IProjectInfo;

    async initializeComponent() {
        const projectPageService = await CommonServices.getProjectPageService();
        this.project = await projectPageService.getProject();        
        this.dataManager = await CommonServices.getExtensionDataManager();
        //await dataManager.queryCollections();
        try {
            let docs : Array<PipelineContextDetails> = await this.dataManager.getDocuments(this.getPipelineContextDocumentCollectionName());
            this.Items.value = docs;
        }
        catch(e) {
            if (e.status !== 404) {
                throw e;
            }            
        }
    }

    public render() {
        return template.call(this);
    }

    public onAddPipelineContextClick() {
        this.setState({
            AddPipelineContextPanelVisible: true
        });
    }

    @bind
    public AddPipelineContextPanelDismissed() {
        this.setState({
            AddPipelineContextPanelVisible: false
        }); 
    }

    private getPipelineContextDocumentCollectionName() {
        return `${this.project!.id}_PipelineContexts`;
    }

    //items: IAddPipelineContextPanelResult[] = [];
    @bind
    public AddPipelineContextPanelCreateClicked(result: IAddPipelineContextPanelResult) {
        this.Items.push(result);
        this.setState({
            AddPipelineContextPanelVisible: false
        }); 
        this.dataManager!.createDocument(this.getPipelineContextDocumentCollectionName(), result);
    }

    @bind
    public async rowSelected(event: React.SyntheticEvent<HTMLElement>, tableRow: ITableRow<PipelineContextDetails>) {
        console.log(tableRow);        
        this.props.setContextid(tableRow.data.id!);
    }
}
