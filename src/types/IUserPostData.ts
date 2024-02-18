export default interface IPostData {
  id?: any | null,
  title: string,
  body: string,
  tags: Array<string>,
  userId: number
}