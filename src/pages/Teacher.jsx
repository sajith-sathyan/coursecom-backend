import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import updatePageVisit from "../Helper/AnalyticsService";
const dummyPosts = [
  {
    id: 1,
    avatar:
      "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
    name: "John Doe",
    post: 2,
  },
  {
    id: 2,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1K68QF717KgWu76vmBt8MkubOA7QV-dfmGBnNh03YSM3LXx3prK5mNh28OVbjnvyeQuA&usqp=CAU",
    name: "Jane Smith",
    post: 0,
  },
  {
    id: 3,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXO5qAbwVHvN94SlOxYVmd-yrESgkwvrTZZCv7PyRHtchQQ4g2n1rq3NWgA3aLpn_6T1A&usqp=CAU",
    name: "Alice Johnson",
    post: 5,
  },
  {
    id: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxgPBpdgQ5ZgGuqjfztnZLwBIQ8-O0i1BmoNHYxe-K7cmcilXFm4vnSzjptWT2UtpMhPQ&usqp=CAU",
    name: "Bob Brown",
    post: 3,
  },
  {
    id: 5,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeZzGCA-mFw3nkku-Vmezxr9_5-fQa-1BCGYJjcijI_dpO2UkXlnUYQrsrF4v3wIPJXoQ&usqp=CAU",
    name: "Emily Davis",
    post: 1,
  },
];

function Teacher() {
  const [authors, setAuthors] = useState(dummyPosts);
  useEffect(()=>{
    updatePageVisit('Teacher')

  },[])
  return (
    <>
      <Header />
      <section className="authors">
        {authors.length > 0 ? (
          <div className="container authors__container">
            {authors.map(({ id, avatar, name, post }) => {
              return (
                <Link key={id} to={`/posts/users/${id}`} className="author">
                  <div className="author__avatar">
                    <img src={avatar} alt={`Image of ${name}`} />
                  </div>
                  <div className="author__info">
                    <h4>{name}</h4>
                    <p>{post}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <h2 className="center">No Teacher Found</h2>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Teacher;
