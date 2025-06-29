import { getCategoryById } from '@/actions/categories';
import { FormCategory } from '@/components/modules/categories/form-category';

export default async function CategoryEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const data = await getCategoryById(Number(id));
  return (
    <section className='container mx-auto px-4 md:p-6 mb-20'>
      <FormCategory category={data!} isEdit />
    </section>
  );
}
