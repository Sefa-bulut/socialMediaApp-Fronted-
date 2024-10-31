import React from 'react'
import Post from '../Post/Post'
import {useEffect, useState} from 'react'
import PostForm from '../Post/PostForm';

export default function Home() {
      //muhtemel oluşabilecek hata için error state'i
      const [error, setError] = useState(null);
      //veri çekme işlemi yaparken kullanıcıyı bilgilendirmek için kullanılacak bir state
      const [isLoaded, setIsLoaded] = useState(false);
      //verileri tutacağımız post listemiz
      const [postList, setPostList] = useState([]);

    //localhost port 8080'e bir Apı call
    //fetch("http://localhost:8080/posts")
    //ana adresi proxy olarak package.json'da tanımladık
    const refreshPosts = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result)
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
                setError(error);
            }
        )
    }
  
    //component ilk yüklendiğinde ve sadece 1 kez çalışacak
    useEffect(() => {
        refreshPosts();
    }, []); // Boş bağımlılık dizisi ile yalnızca bileşen ilk yüklendiğinde çalışır
  
    //veri çekme işleminde aldığımız sonuca göre componentimizi return ediyoruz
      if(error) {
          //bir hata oluştu demektir
          return <div>Error!!!</div>;
      } else if(!isLoaded) {
          //bir hata yok ama veri daha gelmedi demektir
          return <div>Loading...</div>
      } else {
          //veri başarılı bir şekilde geldi demektir
          return(
            <div className='container' >
                {localStorage.getItem("currentUser") == null ? "":
                <PostForm userId={localStorage.getItem("currentUser")} userName = {localStorage.getItem("userName")} refreshPosts = {refreshPosts} />}
                  {postList.map(post => (
                        <Post
                            likes = {post.postLikes}
                            postId = {post.id}
                            userId = {post.userId}
                            userName = {post.userName}
                            title = {post.title}
                            text = {post.text}
                            />
                    ))}
            </div>
          );
      }
}
