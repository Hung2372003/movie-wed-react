import React, { useState } from "react";

export interface SearchFormValues {
  movieName?: string;
  genres?: string[];
  rating?: string;
  releaseYearFrom?: string;
  releaseYearTo?: string;
}

interface Option {
  value: string;
  label: string;
}

const genreOptions: Option[] = [
  { value: "Movie", label: "Movie" },
  { value: "Series", label: "Series" },
];

const ratingOptions = [
  { value: "0-3", label: "0 - 3" },
  { value: "3-5", label: "3 - 5" },
  { value: "5-7", label: "5 - 7" },
  { value: "7-10", label: "7 - 10" },
];

const yearOptions = Array.from({ length: 31 }, (_, i) => {
  const year = (1995 + i).toString();
  return { value: year, label: year };
});

// Custom dropdown multiple
const GenresDropdown: React.FC<{
  selected: string[];
  onChange: (values: string[]) => void;
}> = ({ selected, onChange }) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const removeOption = (value: string) => {
    onChange(selected.filter((v) => v !== value));
  };

  return (
    <div className="group-ip">
      <div
        className={`ui fluid dropdown selection multiple ${
          open ? "active visible" : ""
        }`}
        tabIndex={0}
        onClick={() => setOpen(!open)}
      >
        <select name="skills" multiple value={selected} onChange={() => {}}>
          <option value="">Enter to filter genres</option>
          {genreOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <i className="dropdown icon"></i>

        {/* selected labels */}
        {selected.map((val) => {
          const label = genreOptions.find((o) => o.value === val)?.label ?? val;
          return (
            <a
              key={val}
              className="ui label transition visible"
              data-value={val}
              style={{ display: "inline-block !important" }}
              onClick={(e) => {
                e.stopPropagation();
                removeOption(val);
              }}
            >
              {label}
              <i className="delete icon"></i>
            </a>
          );
        })}

        <div className="default text">Enter to filter genres</div>

        {/* dropdown menu */}
        <div
          className={`menu transition ${open ? "visible" : "hidden"}`}
          tabIndex={-1}
        >
          {genreOptions.map((o) => (
            <div
              key={o.value}
              className={`item ${
                selected.includes(o.value) ? "active filtered" : ""
              }`}
              data-value={o.value}
              onClick={(e) => {
                e.stopPropagation();
                toggleOption(o.value);
              }}
            >
              {o.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SearchFormProps {
  onSubmit: (data: SearchFormValues) => void;
}
const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SearchFormValues>({
    movieName: "",
    genres: [],
    rating: "",
    releaseYearFrom: "",
    releaseYearTo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     onSubmit(formData);
    console.log("Form submitted:", formData);
  };

  return (
    <div className="searh-form">
      <h4 className="sb-title">Search for movie</h4>
      <form className="form-style-1" onSubmit={handleSubmit}>
        <div className="row">
          {/* Movie name */}
          <div className="col-md-12 form-it">
            <label>Movie name</label>
            <input
              type="text"
              name="movieName"
              placeholder="Enter keywords"
              value={formData.movieName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, movieName: e.target.value }))
              }
            />
          </div>

          {/* Genres */}
          <div className="col-md-12 form-it">
            <label>Genres & Subgenres</label>
            <GenresDropdown
              selected={formData.genres ?? []}
              onChange={(genres) => setFormData((prev) => ({ ...prev, genres }))}
            />
          </div>

          {/* Rating */}
          <div className="col-md-12 form-it">
            <label>Rating Range</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rating: e.target.value }))
              }
            >
              <option value="">-- Select the rating range below --</option>
              {ratingOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Release Year */}
          <div className="col-md-12 form-it">
            <label>Release Year</label>
            <div className="row">
              <div className="col-md-6">
                <select
                  name="releaseYearFrom"
                  value={formData.releaseYearFrom}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      releaseYearFrom: e.target.value,
                    }))
                  }
                >
                  <option value="">From</option>
                  {yearOptions.map((y) => (
                    <option key={y.value} value={y.value}>
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <select
                  name="releaseYearTo"
                  value={formData.releaseYearTo}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      releaseYearTo: e.target.value,
                    }))
                  }
                >
                  <option value="">To</option>
                  {yearOptions.map((y) => (
                    <option key={y.value} value={y.value}>
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="col-md-12">
            <input className="submit" type="submit" value="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
