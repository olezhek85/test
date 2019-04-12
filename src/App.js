import React from "react"
import TestInput from "./components/TestInput";
// import RSSClient from "./components/RSSClient"
import Dismissible from "./components/Dismissible"

export default class App extends React.Component {

    handleClick() {

    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm"/>
                    <div className="col-sm">
                        <TestInput/>
                        {/*<RSSClient/>*/}

                        <div className="mt-2">
                            <button onClick={this.handleClick}>
                                Open Something!
                            </button>
                            <Dismissible onDismiss={() => console.log('123')}>
                                Test
                            </Dismissible>
                        </div>

                    </div>
                    <div className="col-sm"/>
                </div>
            </div>
        )
    }
}