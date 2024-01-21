import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Toaster } from 'react-hot-toast';
import * as Yup from "yup";
import "./index.scss";
const AddPage = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('')
  const [sortvalue, setSortvalue] = useState(null)
  const getAllProducts = async () => {
    const resp = await axios("http://localhost:3000/");
    setProducts(resp.data);
    setLoading(false);
  };

  const postProduct = async (values)=>{
    await axios.post("http://localhost:3000/",values)
    getAllProducts()
  }

  const deleteProduct = async (id)=>{
    await axios.delete(`http://localhost:3000/${id}`)
    getAllProducts()
  }

  const toLowerCase = (item)=>{
    if (typeof item === String) {
      return item.toLowerCase()
    }
    return item
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
    <div><Toaster/></div>
      <Helmet>
        <title>AddPage</title>
      </Helmet>
      <section id="AddPage">
        <div className="container">
          {/* image: {type: String, required:true},
  title: {type: String, required:true},
  desc:  {type: String, required:true},
  price:   {type: Number, required:true},
  category:  {type: String, required:true}, */}
          <Formik
            initialValues={{
              image: "",
              title: "",
              desc: "",
              price: "",
              category: "",
            }}
            validationSchema={Yup.object({
              image: Yup.string()
                .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,"Must be URL!")
                .required("Required"),
              title: Yup.string()
                .max(50, "Must be 50 characters or less")
                .matches(/^[A-Za-z]/,"Must Start with letter")
                .required("Required"),
              desc: Yup.string()
              .max(150, "Must be 150 characters or less")
              .matches(/^[A-Za-z]/,"Must Start with letter")
              .required("Required"),
              price: Yup.number()
                .min(1, "Must be 1 or more")
                .required("Required"),
              category: Yup.string()
              .matches(/^[A-Za-z]/,"Must Start with letter")
              .required("Required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                postProduct(values)
                resetForm()
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <h2>Add Form</h2>
              <div>
                <label htmlFor="image">Image</label>
                <Field class="form-control" name="image" type="text" />
                <div className="error">
                  <ErrorMessage name="image" />
                </div>
              </div>

              <div>
                <label htmlFor="title">Title</label>
                <Field class="form-control" name="title" type="text" />
                <div className="error">
                  <ErrorMessage name="title" />
                </div>
              </div>

              <div>
                <label htmlFor="desc">desc</label>
                <Field class="form-control" name="desc" type="text" />
                <div className="error">
                  <ErrorMessage name="desc" />
                </div>
              </div>

              <div>
                <label htmlFor="price">price</label>
                <Field
                  class="form-control"
                  name="price"
                  type="number"
                  min={1}
                />
                <div className="error">
                  <ErrorMessage name="price" />
                </div>
              </div>

              <div>
                <label htmlFor="category">category</label>
                <Field class="form-control" name="category" type="text" />
                <div className="error">
                  <ErrorMessage name="category" />
                </div>
              </div>

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </section>
      <section id="table">
        <div className="container">
          <input type="text" onChange={(e)=>setSearchValue(e.target.value)} />
          <button className="btn btn-dark" onClick={()=>setSortvalue({property:"title",asc:true})}>A-Z</button>
          <button className="btn btn-dark" onClick={()=>setSortvalue({property:"title",asc:false})}>Z-A</button>
          <button className="btn btn-dark" onClick={()=>setSortvalue({property:"price",asc:false})}>Price decrease</button>
          <button className="btn btn-dark"  onClick={()=>setSortvalue({property:"price",asc:true})}>Price increase</button>
          <button className="btn btn-dark"  onClick={()=>setSortvalue({property:"price",asc:true})}>Default</button>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>desc</th>
                <th>price</th>
                <th>category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products
                .filter(x => x.title.toLowerCase().includes(searchValue.toLocaleLowerCase()))
                .sort((a,b) => {
                  if (sortvalue && sortvalue.asc === true) {
                    return (toLowerCase(a[sortvalue.property]) > toLowerCase(b[sortvalue.property])) ? 1 : ((toLowerCase(b[sortvalue.property]) > toLowerCase(a[sortvalue.property])) ? -1 : 0)
                  }
                  else if(sortvalue && sortvalue.asc === false){
                    return (toLowerCase(a[sortvalue.property]) < toLowerCase(b[sortvalue.property])) ? 1 : ((toLowerCase(b[sortvalue.property]) < toLowerCase(a[sortvalue.property])) ? -1 : 0)
                  }
                 else{
                  return 0
                 }
                })
                .map((item) => (
                  <tr key={item._id}> 
                    <td>
                      <img src={item.image} alt="" />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <button onClick={()=>deleteProduct(item._id)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AddPage;
