import React from "react"
import PropTypes from "prop-types"

export default class Dismissible extends React.Component {
    static propTypes = {
        isEscape: PropTypes.bool,
        target: PropTypes.instanceOf(HTMLElement),
        context: PropTypes.oneOfType([
            PropTypes.instanceOf(Element),
            PropTypes.shape({
                current: PropTypes.instanceOf(Element)
            })
        ]),
        children: PropTypes.node.isRequired,
        onDismiss: PropTypes.func.isRequired
    };

    static defaultProps = {
        isEscape: false,
        target: null,
        context: null
    };

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.wrappedRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(e) {
        if (this.wrappedRef && !this.wrappedRef.current.contains(e.target)) {
            this.props.onDismiss();
        }
    }

    render() {
        const {isEscape, target, context, children, onDismiss} = this.props;

        return (
            <div ref={this.wrappedRef}>
                <div className="popup">
                    <a className="close" href="#" onClick={onDismiss}>&times;</a>
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}
