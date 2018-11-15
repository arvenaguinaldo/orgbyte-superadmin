import React, {Component} from 'react';
import OrganizationEdit from 'containers/OrganizationList/EditModal';
import PresidentEdit from 'containers/PresidentList/EditModal';
import MemberEdit from 'containers/Membership/MembershipPage/EditModal';

class EditModals extends Component {
  render() {
    return (
      <div>
        <OrganizationEdit />
        <PresidentEdit />
        <MemberEdit />
      </div>
    );
  }
}

export default EditModals;
