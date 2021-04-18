import { Header } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { TextField } from "azure-devops-ui/TextField";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import { Card } from "azure-devops-ui/Card";
import { Panel } from "azure-devops-ui/Panel";
import { Observer } from "azure-devops-ui/Observer";
import { SurfaceBackground, SurfaceContext } from "azure-devops-ui/Surface";
import { Button } from "azure-devops-ui/Button";
import { MyList } from "../MyList/MyList";
import { FirstState } from "./FirstState.interface";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { First } from "./First";



const template = function (this: First): JSX.Element {
return <SurfaceContext.Provider value={{ background: SurfaceBackground.neutral }}>
            <Page className="sample-hub flex-grow">
                <Header title="Work Item Open Sample" />
                <div className="page-content">
                <Card className="flex-grow">
                    <div>Page content</div>
                    </Card>
                    <div className="flex-row flex-center">
                    <TextField className="sample-work-item-id-input" label="Existing work item id" value={this.workItemIdValue} onChange={(ev, newValue) => { this.workItemIdValue.value = newValue; }} />
                    
                            <Button className="sample-work-item-button" text="Add data" onClick={() => this.onAddDataClick()} />
                    
                    </div>
                    <div className="flex-row flex-center">
                        <Button className="sample-work-item-button" text="List all documents" onClick={() => this.onListAllDocumentsClick()} />
                    </div>
                    <div className="flex-row flex-center">
                        {/* <Observer> */}
                        <MyList items={this.state.items}></MyList>
                        {this.state.items}
                        {/* </Observer> */}
                    </div>
                </div>
                
                <div className="page-content page-content-top flex-column rhythm-vertical-16">
                    <p className="wordwrap">Some content {this.state.token}</p>
                    <div className="flex-row flex-center">
                        Text
                        <label htmlFor="message-level-picker">Message level: </label>
                        <p>Paragraph</p>
                        <div>
                            <ButtonGroup>
                            <Button className="sample-work-item-button" text="Add data" onClick={() => this.onAddDataClick()} />
                            </ButtonGroup>
                        </div>
                    </div>
                    {/* <ReactJson src={SDK.getUser()}/> */}
                    <div className="sample-form-section flex-row flex-center">
                        <TextField className="sample-work-item-id-input" label="Existing work item id" value={this.workItemIdValue} onChange={(ev, newValue) => { this.workItemIdValue.value = newValue; }} />
                        <Button className="sample-work-item-button" text="Open..." onClick={() => this.onOpenExistingWorkItemClick()} />
                    </div>
                    <div className="sample-form-section flex-row flex-center">
                        <div className="flex-column">
                            <label htmlFor="work-item-type-picker">New work item type:</label>
                            <Dropdown<string>
                                className="sample-work-item-type-picker"
                                items={this.workItemTypes}
                                onSelect={(event, item) => { this.workItemTypeValue.value = item.data! }}
                                selection={this.selection}
                            />
                        </div>
                       
                        <Button className="sample-work-item-button" text="New..." onClick={() => this.onOpenNewWorkItemClick()} />
                        
                    </div>
                    <div className="sample-form-section flex-row flex-center">
                        <Button onClick={() => this.setState({ expanded: true })}>Show Panel</Button>
                    </div>
                </div>
            </Page>
            
                {this.state.expanded && (
                    <Panel
                        onDismiss={() => this.setState({ expanded: false })}
                        titleProps={{ text: "Sample Panel Title" }}
                        description={
                            "A description of the header. It can expand to multiple lines. Consumers should try to limit this to a maximum of three lines."
                        }
                        footerButtonProps={[
                            { text: "Cancel", onClick: () => this.setState({ expanded: false }) },
                            { text: "Create", primary: true }
                        ]}
                    >
                        <div style={{ height: "1200px" }}>Panel Content</div>
                    </Panel>
                )}
            </SurfaceContext.Provider>
};

export default template;