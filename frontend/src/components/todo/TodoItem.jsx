import React, { useState } from 'react';
import { 
  Check, 
  Edit2, 
  Trash2, 
  Languages, 
  Brain, 
  ChevronDown, 
  ChevronRight,
  Calendar,
  Globe 
} from 'lucide-react';
import { format } from 'date-fns';
import Button from '../common/Button';
import ConfirmDialog from '../common/ConfirmDialog';
import TranslationModal from './TranslationModal';
import SubtaskList from './SubtaskList';
import { useTodos } from '../../hooks/useTodos';
import { useSubtasks } from '../../hooks/useSubtasks';

const TodoItem = ({ todo, onEdit }) => {
  const { toggleTodo, deleteTodo } = useTodos(false);
  const { generateSubtasks, generating } = useSubtasks();
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleToggleComplete = async () => {
    try {
      setIsToggling(true);
      await toggleTodo(todo.id);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  const handleGenerateSubtasks = async () => {
    try {
      await generateSubtasks(todo.id, 5);
      setShowSubtasks(true);
    } catch (error) {
      console.error('Failed to generate subtasks:', error);
    }
  };

  const hasSubtasks = todo.subtasks && todo.subtasks.length > 0;
  const hasTranslations = todo.translations && todo.translations.length > 0;

  // Get translated content for selected language
  const getTranslatedContent = () => {
    if (!selectedLanguage || !hasTranslations) {
      return { title: todo.title, description: todo.description };
    }
    
    const translation = todo.translations.find(t => t.language === selectedLanguage);
    if (!translation) {
      return { title: todo.title, description: todo.description };
    }
    
    return {
      title: translation.translated_title || todo.title,
      description: translation.translated_description || todo.description
    };
  };

  const { title: displayTitle, description: displayDescription } = getTranslatedContent();

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        {/* Main todo content */}
        <div className="flex items-start space-x-3">
          {/* Completion checkbox */}
          <button
            onClick={handleToggleComplete}
            disabled={isToggling}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? 'bg-success-600 border-success-600 text-white'
                : 'border-gray-300 hover:border-success-500'
            }`}
          >
            {todo.completed && <Check className="w-3 h-3" />}
          </button>

          {/* Todo content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className={`text-sm font-medium ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {displayTitle}
              </h3>
              {selectedLanguage && (
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full flex items-center">
                  <Globe className="w-3 h-3 mr-1" />
                  {selectedLanguage}
                </span>
              )}
            </div>
            
            {displayDescription && (
              <p className={`mt-1 text-sm ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
              }`}>
                {displayDescription}
              </p>
            )}

            {/* Metadata */}
            <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {todo.created_at ? format(new Date(todo.created_at), 'MMM d, yyyy') : 'Unknown date'}
              </span>
              
              {hasSubtasks && (
                <span>
                  {todo.subtasks.filter(s => s.completed).length}/{todo.subtasks.length} subtask{todo.subtasks.length !== 1 ? 's' : ''} completed
                </span>
              )}
              
              {hasTranslations && (
                <span>{todo.translations.length} translation{todo.translations.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1">
            {/* Language selector */}
            {hasTranslations && (
              <select
                value={selectedLanguage || ''}
                onChange={(e) => setSelectedLanguage(e.target.value || null)}
                className="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Original</option>
                {todo.translations.map(translation => (
                  <option key={translation.language} value={translation.language}>
                    {translation.language}
                  </option>
                ))}
              </select>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTranslationModal(true)}
              icon={<Languages className="w-4 h-4" />}
              title="Translate"
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerateSubtasks}
              loading={generating}
              icon={<Brain className="w-4 h-4" />}
              title="Generate Subtasks"
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(todo)}
              icon={<Edit2 className="w-4 h-4" />}
              title="Edit"
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              icon={<Trash2 className="w-4 h-4" />}
              className="text-danger-600 hover:text-danger-700"
              title="Delete"
            />
          </div>
        </div>

        {/* Subtasks toggle */}
        {hasSubtasks && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSubtasks(!showSubtasks)}
              icon={showSubtasks ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              className="text-gray-600"
            >
              {showSubtasks ? 'Hide' : 'Show'} Subtasks ({todo.subtasks.length})
            </Button>
          </div>
        )}

        {/* Subtasks list */}
        {showSubtasks && hasSubtasks && (
          <div className="mt-3">
            <SubtaskList subtasks={todo.subtasks} />
          </div>
        )}

        {/* Translations preview */}
        {hasTranslations && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Translations: {todo.translations?.map(t => t.language || 'Unknown').join(', ')}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Todo"
        message="Are you sure you want to delete this todo? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />

              <TranslationModal
          isOpen={showTranslationModal}
          onClose={() => setShowTranslationModal(false)}
          todo={todo}
          onTranslationComplete={(language) => {
            setSelectedLanguage(language);
            setShowTranslationModal(false);
          }}
        />
    </>
  );
};

export default TodoItem; 