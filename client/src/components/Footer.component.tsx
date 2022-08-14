import React from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useAppSelector } from 'hooks/use-type-selector.hook';
import { Site } from 'interfaces/Sites.interface';
import { selectAllSites } from 'store/reducers/sites.reducer';

export const Footer: React.FC = () => {
  const sites = useAppSelector((state) => selectAllSites(state));

  const renderInfo = ({ address, phone, hours, email }: Site) => (
    <div className="wrapper">
      <div className="left">
        <h2>Contact Information</h2>
        <div className="business_nfo">
          <div className="tag">
            <ContactsIcon />
            <div className="nfo">
              <div>Address</div>
              <div>{address}</div>
            </div>
          </div>
          <div className="tag">
            <TimelapseIcon />
            <div className="nfo">
              <div>Hours</div>
              <div>{hours}</div>
            </div>
          </div>
          <div className="tag">
            <PhoneIcon />
            <div className="nfo">
              <div>Phone</div>
              <div>{phone}</div>
            </div>
          </div>
          <div className="tag">
            <EmailIcon />
            <div className="nfo">
              <div>Email</div>
              <div>{email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <h2>Be first to know</h2>
        <div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Wave</div>
      </div>
      {sites.length ? renderInfo(sites[0]) : null}
    </footer>
  );
};
