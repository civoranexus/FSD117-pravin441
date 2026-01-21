import { useRouter } from "next/router";

const blogContent = {
    "learning-nextjs": {
        title: "Learning Next.js",
        content: `
Next.js is a powerful React framework that makes building web applications easier and faster.
It provides features like file-based routing, server-side rendering, and SEO optimization out of the box.

While learning Next.js, I understood how pages are created automatically using the pages folder.
This helps developers focus more on building features rather than managing routes manually.

Overall, Next.js improves performance and developer experience, making it a great choice for modern web apps.
`
    },

    "why-react": {
        title: "Why I Like React",
        content: `
React makes UI development simple by breaking the interface into reusable components.
This component-based approach improves code readability and maintainability.

React's state management and virtual DOM help build fast and interactive applications.
Learning React has helped me think more clearly about UI logic and data flow.

That’s why React is my favorite frontend library.
`
    },

    "frontend-journey": {
        title: "My Frontend Learning Journey",
        content: `
My frontend journey started with HTML and CSS, where I learned how websites are structured and styled.
Later, I explored JavaScript to add interactivity and logic.

Currently, I am learning React and Next.js to build modern, scalable web applications.
Consistent practice and real projects are helping me grow every day.
`
    }
};

export default function BlogPost() {
    const router = useRouter();
    const { slug } = router.query;
    const blog = blogContent[slug];

    if (!blog) return <p style={{ padding: "40px" }}>Loading...</p>;

    return (
        <div style={{ padding: "40px" }}>
            <h1>{blog.title}</h1>
            <p style={{ lineHeight: "1.8", marginTop: "20px" }}>
                {blog.content}
            </p>
        </div>
    );
}
