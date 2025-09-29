import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormPageLayout } from '../components/common/FormPageLayout';
import { ChallengeForm } from '../components/challenges/ChallengeForm';

const CreateChallengePage: React.FC = () => {
	const navigate = useNavigate();

	const handleCreateChallenge = (challenge: any) => {
		// Navigate to the challenges list or the new challenge detail page
		if (challenge && challenge.id) {
			// Navigate to the new challenge detail page
			navigate(`/challenge/${challenge.id}`);
		} else {
			// Fallback to challenges list
			navigate('/challenges');
		}
	};

	const handleCancel = () => {
		navigate('/challenges');
	};

	return (
		<FormPageLayout
			title="Create a New Challenge"
			description="Define the rules, set the goal, and invite others to join."
		>
			<ChallengeForm onSubmit={handleCreateChallenge} onCancel={handleCancel} isEditing={false} />
		</FormPageLayout>
	);
};
export default CreateChallengePage;
