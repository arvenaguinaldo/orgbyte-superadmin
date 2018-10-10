import React, {Component} from 'react';
import OrganizationEdit from 'containers/OrganizationList/EditModal';
import PresidentEdit from 'containers/PresidentList/EditModal';

class EditModals extends Component {
  render() {
    return (
      <div>
        <OrganizationEdit />
        <PresidentEdit />
      </div>
    );
  }
}

export default EditModals;
