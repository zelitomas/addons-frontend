// import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';

// import SearchResult from 'amo/components/SearchResult';
// import CardList from 'ui/components/CardList';

import './styles.scss';


export default class AddonVersionInfo extends React.Component {
  componentWillMount() {
    const { addon, dispatch, errorHandler } = this.props;

    if (addon) {
      dispatch(setViewContext(addon.type));
    } else {
      dispatch(fetchAddonVersions({
        errorHandler,
        filter: 'only_beta',
        page_size: 1,
        slug: addon.slug,
      }));
    }
  }

  // componentWillReceiveProps({ addon: newAddon }) {
  //   const { addon: oldAddon, dispatch, errorHandler } = this.props;
  //
  //   if (params.slug !== newParams.slug) {
  //     dispatch(fetchAddon({ slug: newParams.slug, errorHandler }));
  //   }
  // }

  render() {
    return (
      <div className="AddonVersionInfo">
        {this.props.children}
      </div>
    );
  }
}
