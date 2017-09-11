// import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import SearchResult from 'amo/components/SearchResult';
import { withErrorHandler } from 'core/errorHandler';
import translate from 'core/i18n/translate';
import { withInstallHelpers } from 'core/installAddon';
import { fetchAddon } from 'core/reducers/addons';
import { fetchAddonVersions } from 'core/reducers/addonVersions';
import Paginate from 'core/components/Paginate';
import Card from 'ui/components/Card';

import './styles.scss';


export class AddonVersionHistoryBase extends React.Component {
  componentWillMount() {
    const { addon, dispatch, errorHandler, slug } = this.props;

    if (addon) {
      dispatch(fetchAddonVersions({
        errorHandler,
        // filter,
        slug: addon.slug,
        versionsToFetch: 25,
      }));
    } else {
      dispatch(fetchAddon({ errorHandler, slug }));
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
    const { addon, i18n } = this.props;

    if (!addon) {
      return <div>LOADING</div>;
    }

    const headerText = i18n.sprintf(
      i18n.gettext('Version history for %(addonName)s'),
      { addonName: addon.name }
    );

    return (
      <Card className="AddonVersionInfo" header={headerText}>
        <h2>{i18n.gettext('Beta Version')}</h2>
        {addon.current_beta_version.url}
      </Card>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    slug: ownProps.params.addonSlug,
  };
};

export default compose(
  connect(mapStateToProps),
  translate(),
  withInstallHelpers({ src: 'dp-btn-primary' }),
  withErrorHandler({ name: 'AddonVersionHistory' }),
)(AddonVersionHistoryBase);
