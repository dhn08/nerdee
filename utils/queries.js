export const allCoursesQuery = () => {
  const query = `*[_type == "course"] | order(_createdAt desc){
    _id,
    author,
    description,
    price,
    title,
    image{
    asset->{
    _id,
    url
  }
  }
  }`;

  return query;
};
export const courseDetailQuery = (courseId) => {
  const query = `*[_type == "course" && _id == '${courseId}'][0]{
        _id,
        author,
        description,
        price,
        title,
        image{
        asset->{
        _id,
        url
      }
      },
      comment[]->{_id,message,_createdAt,user->{_id,name}},
      course_sections[]->{
        _id,
        section_number,
        section_title,
        episodes[]->{
          title,
          duration,
          file{
          asset->{url}
        }
        }
      }
      }`;
  return query;
};
export const courseSectionsDetailQuery = (courseId) => {
  const query = `*[_type == "course" && _id == '${courseId}'][0]{
    title,
    comment[]->{_id,message,_createdAt,user->{_id,name}},
    course_sections[]->{
      _id,
      section_number,
      section_title,
      episodes[]->{
        title,
        duration,
        file{
        asset->{url}
      }
      }
    }
      }`;
  return query;
};
export const getCommentQuery = (commentId) => {
  const query = `*[_type == "comment" && _id == '${commentId}'][0]{
    message,
    user->{name}
  }`;
  return query;
};
export const cartDetailQuery = (courseIds) => {
  // console.log(courseIds);
  const query = `*[_type == "course" && _id in ${courseIds}]{
        _id,
        author,
        description,
        price,
        title,
        image{
        asset->{
        _id,
        url
      }
      }
      }`;
  return query;
};
export const allSectorsNameQuery = () => {
  const query = `*[_type == "sector"] | order(_createdAt desc){
    _id,
    sector_name,
  }`;

  return query;
};

export const allSectorsQuery = () => {
  const query = `*[_type == "sector"] | order(_createdAt desc){
    _id,
    sector_name,
    featured_courses[]->{
      _id,
      author,
      description,
      price,
      title,
      image{
      asset->
      {
      _id,
      url
      } 
           }
    },
    sector_image{
    asset->{
    _id,
    url
  }
  }
  }`;

  return query;
};
export const sectorDetailQuery = (sectorId) => {
  const query = `*[_type == "sector" && _id == '${sectorId}'][0]{
        _id,
        sector_name,
        featured_courses[]->{
          _id,
          author,
          description,
          price,
          title,
          image{
          asset->
          {
          _id,
          url
          } 
               }
        },
        sector_image{
        asset->{
        _id,
        url
      }
      }
      }`;
  return query;
};
export const tempTeacherDetailQuery = () => {
  const query = `*[_type == "tempteacher"]{
    _id,
    email,
    name,
    password
  }`;
  return query;
};
export const findUserQuery = (emailId) => {
  const query = `*[_type == "user" && email =='${emailId}'][0]{
    _id,
    email,
    name,
    password,
    role,
    courses[]->
  }`;
  return query;
};

export const searchCourseQuery = (searchTerm) => {
  const query = `*[_type == "course" && title match '${searchTerm}*' || description match '${searchTerm}*']{
    _id,
    author,
    description,
    price,
    title,
    image{
    asset->{
    _id,
    url
  }
  }
  } `;
  return query;
};
