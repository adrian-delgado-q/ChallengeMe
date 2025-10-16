
import { useGetChallengesQuery } from '/home/adrian/dev/ChallengeMe/frontend/src/graphql/definitions/challenges.generated.ts'

const ChallengesDisplay = () => {
  const gqlEndpoint = {
    endpoint: "http://localhost:4001/graphql",
    fetchParams: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
  const { data, isLoading, error } = useGetChallengesQuery(
    gqlEndpoint,
    {},
    {
      // Optional: configure query options here
    }
  );

  if (isLoading) {
    return <div>Loading challenges...</div>;
  }

  if (error) {
    console.error('Error fetching challenges:', error);
    return <div>Error fetching challenges</div>;
  }

  return (
    <div>
      <h1>Challenges</h1>
      <ul>
        {data?.challenges?.map((challenge) => (
          <li key={challenge.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{challenge.title}</h2>
            {challenge.image_url && <img src={challenge.image_url} alt={challenge.title || 'Challenge image'} style={{ maxWidth: '200px' }} />}
            <p><strong>Description:</strong> {challenge.description}</p>
            <p><strong>Instructions:</strong> {challenge.instructions}</p>
            <p><strong>Creator:</strong> {challenge.creator?.username}</p>
            <p><strong>Status:</strong> {challenge.status}</p>
            <p><strong>Type:</strong> {challenge.challenge_type}</p>
            <p><strong>Participants:</strong> {challenge.participant_count} / {challenge.max_participants || 'Unlimited'}</p>
            <p><strong>Dates:</strong> {challenge.start_date} to {challenge.end_date}</p>
            <div>
              <strong>Milestones:</strong>
              <ul>
                {challenge.milestones?.map(milestone => (
                  <li key={milestone.id}>{milestone.name} - Target: {milestone.target_value} {milestone.activity_type?.unit_label}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Supported Activities:</strong>
              <ul>
                {challenge.supported_activities?.map(activity => (
                  <li key={activity.id}>{activity.activity_type?.name}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengesDisplay;
