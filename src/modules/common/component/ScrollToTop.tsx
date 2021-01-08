import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps {}

class ScrollToTop extends Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);