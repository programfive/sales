import { getCategoryById } from '@/actions/categories';
import { FormCategory } from '@/components/modules/categories/form-category';

export default async function CategoryShowPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await getCategoryById(Number(params.id));

  if (!category) {
    return <div className='p-8'>Categoría no encontrada</div>;
  }

  return (
    <section className='container mx-auto px-4 md:p-6 mb-20'>
      <FormCategory category={category} isShow={true} />
    </section>
  );
}
