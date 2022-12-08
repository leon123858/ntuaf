import { useParams } from 'react-router-dom';

export default function Display() {
	const { displayId } = useParams();
	return <div>{displayId}</div>;
}
