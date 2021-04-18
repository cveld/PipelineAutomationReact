import { ObservableArray } from "azure-devops-ui/Core/Observable";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { IAddPipelineContextPanelResult } from "./AddPipelineContextPanel";

export interface IPipelineAutomationState {
    AddPipelineContextPanelVisible : boolean,
    Items?: ObservableArray<IAddPipelineContextPanelResult>;
}

export interface IPipelineAutomationProps {
    setContextid: (contextId: string) => void
}