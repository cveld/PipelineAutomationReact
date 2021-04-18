import React from "react";
import { PipelineContextDetail } from "../PipelineContext/PipelineContextDetail";
import { PipelineAutomation } from "./PipelineAutomation";
import { CommonServices } from "../Common/azure-devops-ui";
import { bind } from "bind-decorator";
import * as SDK from "azure-devops-extension-sdk";
import { IHostNavigationService } from "azure-devops-extension-api";

interface IPipelineAutomationContainerState {
    contextid?: string;
}
export class PipelineAutomationContainer extends React.Component<{}, IPipelineAutomationContainerState> {
    constructor(props: any) {
        super(props);        
        this.state = {};
    }

    navService?: IHostNavigationService = undefined;

    public componentDidMount() {
        SDK.init();
        this.initializeComponent();        
    }
    
    async initializeComponent() {
        this.navService = await CommonServices.getNavigationService();     
        const queryParams = await this.navService.getQueryParams();
        this.setState({ contextid: queryParams["contextid"]});
    }

    @bind
    async setContextid(contextid: string) {        
        this.navService!.setQueryParams({ contextid: contextid });
        this.setState({ contextid: contextid });
    }
    render(): JSX.Element {
        return <>{
                !this.state.contextid ?
                <PipelineAutomation setContextid={this.setContextid}></PipelineAutomation>
            :
                <PipelineContextDetail contextid={this.state.contextid!} setContextid={this.setContextid}></PipelineContextDetail>
            }</>
            
    }
}