import React from 'react';
import logo from './logo.svg';
import './App.css';
import { First } from "./First/First";
import { PipelineAutomation } from './PipelineAutomation/PipelineAutomation';
import * as SDK from "azure-devops-extension-sdk";
import { Route, RouteComponentProps, Switch, useLocation, withRouter } from 'react-router-dom';
import { PipelineContextDetail } from './PipelineContext/PipelineContextDetail';
import { PipelineAutomationContainer } from './PipelineAutomation/PipelineAutomationContainer';

interface IAppProps {
  location: string
}

type PropsType = RouteComponentProps;
class App extends React.Component<PropsType, {}> {
  // getPipelineContextId2() {    
  //   return new URLSearchParams(useLocation().search).get('contextid');
  // }
  getPipelineContextId() {   
    console.log(this.props.location.search);
    return new URLSearchParams(this.props.location.search).get('contextid');    
  }

  public render() : JSX.Element {
    const contextid = this.getPipelineContextId();
        
    return <PipelineAutomationContainer />
  }

  public componentDidMount() {
    SDK.init();
  }
}

export default withRouter(App);