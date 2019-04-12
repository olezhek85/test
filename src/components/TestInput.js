import React from "react"

export default class TestInput extends React.Component {
    state = {
        url: "",
        error: ""
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {url} = this.state;
        const isValidUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url);

        if (isValidUrl) {
            window.location.href = url;
        } else {
            this.setState({error: "Please enter valid url"});
        }

    };

    handleChange = e => {
        this.setState({url: e.target.value});
    };

    render() {
        const {url, error} = this.state;

        return (
            <div className="input-group mb-3 pt-5">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" className={"form-control " + (error ? 'is-invalid' : '')} placeholder="Url"
                               aria-label="Url"
                               required
                               aria-describedby="basic-addon1" value={url} onChange={this.handleChange}/>
                        {
                            error && (
                                <div className="invalid-feedback">
                                    {error}
                                </div>
                            )
                        }
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
