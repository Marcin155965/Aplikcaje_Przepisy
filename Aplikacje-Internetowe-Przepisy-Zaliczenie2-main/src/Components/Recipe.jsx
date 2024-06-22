import "./Recipe.css";

const Recipe = ({ recipe }) => {
  return (
    <div className="col-md-4">
      <div className="mb-4 card">
        <img
          src={recipe.recipe.image}
          className="card-img-top"
          alt={recipe.recipe.label}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.recipe.label}</h5>
          <p className="card-text">{recipe.recipe.dietLabels.join(", ")}</p>
          <a
            href={recipe.recipe.url}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
