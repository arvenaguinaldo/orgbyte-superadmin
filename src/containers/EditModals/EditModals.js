import React, {Component} from 'react';
import OrganizationEdit from 'containers/OrganizationList/EditModal';
import PresidentEdit from 'containers/PresidentList/EditModal';
import AccountsEdit from 'containers/AccountList/EditModal';

class EditModals extends Component {
  render() {
    return (
      <div>
        <OrganizationEdit />
        <PresidentEdit />
        <AccountsEdit />
      </div>
    );
  }
}

export default EditModals;
