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
      }
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
