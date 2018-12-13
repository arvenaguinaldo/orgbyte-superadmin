import React, {Component} from 'react';
import OrganizationEdit from 'containers/OrganizationList/EditModal';
import PresidentEdit from 'containers/PresidentList/EditModal';
import MemberEdit from 'containers/Membership/MembershipPage/EditModal';
import AnnouncementEdit from 'containers/Announcements/AnnouncementsPage/EditModal';
import OrgshirtAvailEdit from 'containers/OrganizationalShirts/OrganizationalShirtsPage/EditModal';
import AccountsEdit from 'containers/AccountList/EditModal';
import CollegesEdit from 'containers/Colleges/EditModal';
import CoursesEdit from 'containers/Courses/EditModal';

class EditModals extends Component {
  render() {
    return (
      <div>
        <OrganizationEdit />
        <PresidentEdit />
        <MemberEdit />
        <AnnouncementEdit />
        <OrgshirtAvailEdit />
        <AccountsEdit />
        <CollegesEdit />
        <CoursesEdit />
      </div>
    );
  }
}

export default EditModals;
