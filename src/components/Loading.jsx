import Spinner from 'react-spinner-material';

const Loading = () => {
    return (
		<div className="spinner">
			<Spinner size={100} color={'var(--main-text-color)'} width={1} visible={true} />
		</div>
	);
}

export default Loading;