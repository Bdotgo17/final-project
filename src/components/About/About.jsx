import "./About.css";

function About() {
  return (
    <section className="about__author">
      <img
        src="https://images.freeimages.com/images/large-previews/9a3/black-crumpled-paper-texture-1158396.jpg?fmt=webp&w=500"
        alt="Author"
        className="author__image"
        width={464}
        height={464}
      />
      <div className="author__info">
        <h2 className="about__title">About the Author</h2>
        <p className="about__text">
          Baruc Gomez is a dedicated web developer with a passion for creating
          intuitive and dynamic user experiences. With a keen eye for design,
          Baruc combines technical expertise with creativity to build responsive
          and engaging websites. When not coding, Baruc enjoys spending time
          with family.
        </p>
      </div>
    </section>
  );
}

export default About;
