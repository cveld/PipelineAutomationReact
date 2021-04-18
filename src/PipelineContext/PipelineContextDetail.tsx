import React from "react";
import { useParams } from "react-router-dom";

interface IPipelineContextDetailProps {
    contextid: string,
    setContextid: (contextid: string) => void
}

export class PipelineContextDetail extends React.Component<IPipelineContextDetailProps, {}> {
  render() {
    return (
      <div>
        <h3>ID: {this.props.contextid}</h3>
      </div>
    );
  }
}