import React from "react"

export default class RSSClient extends React.Component {
    state = {
        feed: ""
    };

    componentDidMount() {
        const headers = new Headers();
        headers.append("Content-Type", "text/html");

        fetch('https://news.google.com/?hl=en-US&gl=US&ceid=US:en', {mode: 'no-cors'})
            .then(res => res.text())
            .then(html => {
                const domParser = new DOMParser();
                console.log(html);
            })
    }

    render() {
        return "123"
    }

}