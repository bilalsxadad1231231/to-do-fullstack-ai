import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { MAX_TODO_TITLE_LENGTH, MAX_TODO_DESCRIPTION_LENGTH } from '../../services/constants';

const TodoForm = ({ onSubmit, initialData = null, loading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
    },
  });

  const titleLength = watch('title')?.length || 0;
  const descriptionLength = watch('description')?.length || 0;

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      if (!initialData) {
        reset(); // Only reset if creating new todo
      }
    } catch (error) {
      console.error('Error submitting todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Input
          label="Title"
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: MAX_TODO_TITLE_LENGTH,
              message: `Title must be less than ${MAX_TODO_TITLE_LENGTH} characters`,
            },
          })}
          error={errors.title?.message}
          placeholder="Enter todo title..."
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${titleLength > MAX_TODO_TITLE_LENGTH * 0.9 ? 'text-danger-600' : 'text-gray-500'}`}>
            {titleLength}/{MAX_TODO_TITLE_LENGTH}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          {...register('description', {
            maxLength: {
              value: MAX_TODO_DESCRIPTION_LENGTH,
              message: `Description must be less than ${MAX_TODO_DESCRIPTION_LENGTH} characters`,
            },
          })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          rows={3}
          placeholder="Enter todo description..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-danger-600">{errors.description.message}</p>
        )}
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${descriptionLength > MAX_TODO_DESCRIPTION_LENGTH * 0.9 ? 'text-danger-600' : 'text-gray-500'}`}>
            {descriptionLength}/{MAX_TODO_DESCRIPTION_LENGTH}
          </span>
        </div>
      </div>

      <Button
        type="submit"
        loading={loading}
        disabled={!isValid}
        icon={!initialData ? <Plus className="w-4 h-4" /> : null}
        className="w-full"
      >
        {initialData ? 'Update Todo' : 'Add Todo'}
      </Button>
    </form>
  );
};

export default TodoForm; 