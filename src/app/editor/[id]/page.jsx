import Editor from '@/components/Editor'
// import Editor1 from '@/components/Editor1'

export default async function EditorPage({params}) {
  const { id } = await params;
  return (
    <div>
      <Editor templateId={id} />
      {/* <Editor1 />  */}
    </div>
  )
}