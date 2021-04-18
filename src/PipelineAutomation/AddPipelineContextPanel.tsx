import { ObservableValue } from "azure-devops-ui/Core/Observable";
import React from "react";
import { Panel, TextField } from "../Common/azure-devops-ui";
import "./AddPipelineContextPanel.scss";

interface IAddPipelineContextPanelProps {
    visible: boolean,
    onDismiss: () => void,
    onCreateClicked: (result: IAddPipelineContextPanelResult) => void
}

export interface IAddPipelineContextPanelResult {
   
    PipelineId?: number,
    Branch?: string,
    Name?: string
}

export class AddPipelineContextPanel extends React.Component<IAddPipelineContextPanelProps, {}> {
    public PipelineIdValue = new ObservableValue("");
    public BranchValue = new ObservableValue("");
    public render() : JSX.Element {
        const { visible, onDismiss, onCreateClicked } = this.props;        
        return <> {visible && (
            <Panel
                onDismiss={() => onDismiss()}
                titleProps={{ text: "Sample Panel Title" }}
                description={
                    "A description of the header. It can expand to multiple lines. Consumers should try to limit this to a maximum of three lines."
                }
                footerButtonProps={[
                    { text: "Cancel", onClick: () => onDismiss() },
                    { text: "Create", primary: true, onClick: () => onCreateClicked({
                        PipelineId: parseInt(this.PipelineIdValue.value, 10),
                        Branch: this.BranchValue.value
                    }) }
                ]}
            >
                {/* <div style={{ height: "1200px" }}>Panel Content</div> */}
                <div className="flex-row flex-center">
                        <TextField className="sample-work-item-id-input" label="Pipeline id" value={this.PipelineIdValue} onChange={(ev, newValue) => { this.PipelineIdValue.value = newValue; }} />
                </div>
                <div className="flex-row flex-center">
                        <TextField className="" label="Branch" value={this.BranchValue} onChange={(ev, newValue) => { this.BranchValue.value = newValue; }} />
                </div>
            </Panel>
        )}</>
    }
}