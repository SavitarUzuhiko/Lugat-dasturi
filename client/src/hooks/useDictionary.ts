import {
  useCreateDictionaryMutation,
  useDeleteDictionaryMutation,
  useGetDictionaryQuery,
  useUpdateDictionaryMutation,
  useUploadMutation,
} from '@/app/api';

export function useDictionary(search: string, type: string) {
  const [createDictionary] = useCreateDictionaryMutation();
  const [deleteDictionary] = useDeleteDictionaryMutation();
  const [updateDictionary] = useUpdateDictionaryMutation();
  const [uploadFile] = useUploadMutation();
  const { data, refetch } = useGetDictionaryQuery({ search, type });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await uploadFile(formData).unwrap();
    return response.filePath;
  };

  return {
    data: data?.data || [],
    refetch,
    createDictionary,
    deleteDictionary,
    updateDictionary,
    handleUpload,
  };
}
