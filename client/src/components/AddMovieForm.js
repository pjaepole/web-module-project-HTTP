import React, {useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import axios from 'axios'


const AddMovieForm =(props)=>{
    const {push}=useHistory()
    const initialAddMovieFormValues= {
        title: "",
        director: "",
        metascore: '',
        genre: "",
        description: ""
      }

      const [addMovieFormValues, setAddMovieFormValues]=useState(initialAddMovieFormValues)

      const handleChange=(e)=>{
          console.log(props)
        setAddMovieFormValues({
            ...addMovieFormValues,
            [e.target.name]:e.target.value
        })
      }

      const addMovieFormSubmit=(e)=>{
          e.preventDefault()
          localStorage.setItem('addMovieFormValues',JSON.stringify(addMovieFormValues))
          axios.post('http://localhost:5000/api/movies',addMovieFormValues)
          .then(resp=>{
              props.setMovies(resp.data)
              push('/movies');
                })
          .catch(err=>{console.log(err)})
      }
    return(
        <div>
            <div className="col">
		<div className="modal-content">
			<form onSubmit={addMovieFormSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title"> <strong>ADD Moive</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input 
                        value={addMovieFormValues.title} onChange={handleChange} 
                        name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input 
                        value={addMovieFormValues.director} onChange={handleChange} 
                        name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input 
                        value={addMovieFormValues.genre} onChange={handleChange}
                         name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input
                         value={addMovieFormValues.metascore} onChange={handleChange} 
                         name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea 
                        value={addMovieFormValues.description} onChange={handleChange} 
                        name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Add Movie"/>
					<Link to={`/movies`}>
                        <input type="button" className="btn btn-default" value="Cancel"/>
                        </Link>
				</div>
			</form>
		</div>
	</div>
        </div>

    )
}
export default AddMovieForm