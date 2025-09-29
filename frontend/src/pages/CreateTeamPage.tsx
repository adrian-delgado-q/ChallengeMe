import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormPageLayout } from '../components/common/FormPageLayout';
import { TeamForm } from '../components/teams/TeamForm';

const CreateTeamPage: React.FC = () => {
	const navigate = useNavigate();

	const handleCreateTeam = (team: any) => {
		// Navigate to the teams list or the new team detail page
		if (team && team.id) {
			// Navigate to the new team detail page
			navigate(`/teams/${team.id}`);
		} else {
			// Fallback to teams list
			navigate('/teams');
		}
	};

	const handleCancel = () => {
		navigate('/teams');
	};

	return (
		<FormPageLayout
			title="Create a New Team"
			description="Build your dream team and take on challenges together. Invite friends and compete as a group!"
		>
			<TeamForm onSubmit={handleCreateTeam} onCancel={handleCancel} />
		</FormPageLayout>
	);
};

export default CreateTeamPage;
