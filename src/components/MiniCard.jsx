const MiniCard = ({ spot }) => {
    const { id, status } = spot;
    const bgVariant = status === 'free' ? 'primary' : 'danger-subtle';
    const colorClass = status === 'free' ? 'text-white' : 'text-secondary ';
    const iconClass = status === 'free' ? 'fa-solid fa-car fa-2x text-white' : 'fa-solid fa-car fa-2x text-seconday';

    return (
        <div className={`card ${colorClass} bg-${bgVariant} m-2`} style={{ width: '100px' }}>
            <div className="card-body p-2 text-center ">
                <i className={iconClass}></i>
                <div className="fw-semibold">{id}</div>
            </div>
        </div>
    );
};

export default MiniCard;


