import React from "react";

interface IMyListState {
    props: IMyListProps
}
interface IMyListProps {
    items: Array<string>;
}

export class MyList extends React.Component<IMyListProps, IMyListState> {
    
    constructor(props: IMyListProps) {
        super(props);

        console.log('ctor MyList');
    }
    private listItems(): JSX.Element[] {
        return this.props.items.map((item) =>
            <li>{item}</li>
        );
    }
    public render(): JSX.Element {        
        return <ul>{this.listItems()}</ul>
        ;
    }
}