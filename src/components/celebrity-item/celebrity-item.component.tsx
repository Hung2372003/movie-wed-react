type Props = {
  img: string;
  name: string;
  role: string;
};

const CelebrityItemComponent = ({ img, name, role }: Props) => {
  return (
    <div className="celeb-item">
      <a href="#">
        <img src={img} alt={name} width={70} height={70} />
      </a>
      <div className="celeb-author">
        <h6>
          <a href="#">{name}</a>
        </h6>
        <span>{role}</span>
      </div>
    </div>
  );
};

export default CelebrityItemComponent;
