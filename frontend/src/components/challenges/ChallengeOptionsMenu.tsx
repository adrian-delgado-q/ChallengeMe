import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { Challenge } from '../../types';

// Three dots menu icon
const MoreOptionsIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);

interface ChallengeOptionsMenuProps {
  challenge: Challenge;
  onTestRealTimeUpdates?: () => void;
}

export const ChallengeOptionsMenu: React.FC<ChallengeOptionsMenuProps> = ({
  challenge,
  onTestRealTimeUpdates,
}) => {
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<Icon as={MoreOptionsIcon} w={5} h={5} />}
        variant="ghost"
        size="sm"
        aria-label="More options"
        colorScheme="gray"
      />
      <MenuList>
        <MenuItem onClick={() => navigate(`/activities?challengeId=${challenge.id}`)}>
          Manage Activities
        </MenuItem>
        {process.env.NODE_ENV === 'development' && onTestRealTimeUpdates && (
          <MenuItem onClick={onTestRealTimeUpdates}>Test Real-time Updates</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
