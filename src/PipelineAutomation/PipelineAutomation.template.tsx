import { PipelineAutomation } from "./PipelineAutomation";
import { Header, Observer, Page, Table } from "../Common/azure-devops-ui";
import { TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { AddPipelineContextPanel } from "./AddPipelineContextPanel";

const template = function (this: PipelineAutomation): JSX.Element {    
    const commandBarItems : IHeaderCommandBarItem[] = [
        {
            id: "add",
            text: "Add Pipeline Context",
            onActivate: () => { this.onAddPipelineContextClick() },
            iconProps: {
              iconName: 'Add'
            },
            isPrimary: true,
            tooltipProps: {
              text: "Add a pipeline context"
            }
          },
    ];

    const { AddPipelineContextPanelVisible } = this.state;
    return <Page>
      <Header title="Sample Hub"
    commandBarItems={commandBarItems}
    description="Some description"
    titleSize={TitleSize.Large} />    
      <Table columns={this.columns} itemProvider={this.Items} onSelect={this.rowSelected}></Table>  
      <AddPipelineContextPanel visible={AddPipelineContextPanelVisible} onCreateClicked={this.AddPipelineContextPanelCreateClicked} onDismiss={this.AddPipelineContextPanelDismissed}></AddPipelineContextPanel>
    </Page>
}

export default template;