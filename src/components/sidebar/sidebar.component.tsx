import CelebrityItemComponent from "../celebrity-item/celebrity-item.component";

const celebrities = [
  { img: "images/uploads/ava1.jpg", name: "Samuel N. Jack", role: "Actor" },
  { img: "images/uploads/ava2.jpg", name: "Benjamin Carroll", role: "Actor" },
  { img: "images/uploads/ava3.jpg", name: "Beverly Griffin", role: "Actor" },
  { img: "images/uploads/ava4.jpg", name: "Justin Weaver", role: "Actor" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="celebrities">
        <h4 className="sb-title">Spotlight Celebrities</h4>
        {celebrities.map((celeb, i) => (
          <CelebrityItemComponent key={i} {...celeb} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
