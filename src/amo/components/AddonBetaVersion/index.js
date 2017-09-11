/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import InstallButton from 'core/components/InstallButton';
import { UNKNOWN } from 'core/constants';
import { withErrorHandler } from 'core/errorHandler';
import translate from 'core/i18n/translate';
import { withInstallHelpers } from 'core/installAddon';
import { fetchAddonVersions } from 'core/reducers/addonVersions';
import { getClientCompatibility } from 'core/utils';
import Card from 'ui/components/Card';

import './styles.scss';


type PropTypes = {
  addon: Object | null,
  dispatch: any,
  errorHandler: Object,
  i18n: Object,
};

export class AddonBetaVersionBase extends React.Component {
  componentWillMount() {
    const { addon, dispatch, errorHandler } = this.props;

    if (
      addon && addon.current_beta_version &&
      addon.current_beta_version.release_notes === undefined
    ) {
      dispatch(fetchAddonVersions({
        errorHandlerId: errorHandler.id,
        filter: 'is_beta',
        slug: addon.slug,
        versionsToFetch: 25,
      }));
    }
  }

  props: PropTypes;

  // componentWillReceiveProps({ addon: newAddon }) {
  //   const { addon: oldAddon, dispatch, errorHandler } = this.props;
  //
  //   if (params.slug !== newParams.slug) {
  //     dispatch(fetchAddon({ slug: newParams.slug, errorHandler }));
  //   }
  // }

  render() {
    const {
      addon,
      clientApp,
      i18n,
      installedAddon,
      installStatus,
      userAgentInfo,
    } = this.props;

    if (!addon || !addon.current_beta_version) {
      return null;
    }

    const { compatible: isCompatible } = getClientCompatibility({
      addon, clientApp, userAgentInfo,
    });

    return (
      <Card
        className="AddonBetaVersion"
        header={i18n.gettext('Beta Version')}
      >
        <p>
          {i18n.gettext(`Beta versions are for adventurous, early adopters and
            testers. They contain new features not yet released to the general
            public, but they may also contain bugs. Once you install this
            beta version, you will continue to get beta updates unless you
            uninstall the beta version and install the default version from
            the install button at the top of the page.`
          )}
        </p>

        <p>
          {i18n.gettext(
            'Note: beta versions have not been reviewed by Mozilla.'
          )}
        </p>

        <InstallButton
          {...addon}
          {...installedAddon}
          current_version={addon.current_beta_version}
          addon={addon}
          className="Button--action Button--small"
          disabled={!isCompatible}
          status={installStatus}
        />
      </Card>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  console.log('OWN PROPS', ownProps);
  const addon = ownProps.addon;
  const stateToMap = {
    clientApp: state.api.clientApp,
    installStatus: UNKNOWN,
    userAgentInfo: state.api.userAgentInfo,
  };

  if (!addon) {
    return stateToMap;
  }

  const installedAddon = state.installations[addon.guid] || {};

  return {
    ...addon,
    // The withInstallHelpers HOC also needs to access some properties in
    // here like guid and probably others.
    ...installedAddon,
    ...stateToMap,
    installStatus: installedAddon.status || UNKNOWN,
  };
};

export default compose(
  connect(mapStateToProps),
  translate(),
  withInstallHelpers({ src: 'dp-btn-primary' }),
  withErrorHandler({ name: 'AddonBetaVersion' }),
)(AddonBetaVersionBase);
