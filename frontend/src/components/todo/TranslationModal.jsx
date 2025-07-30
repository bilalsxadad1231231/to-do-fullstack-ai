import React, { useState } from 'react';
import { Languages, Copy, Check } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTranslation } from '../../hooks/useTranslation';
import { LANGUAGES } from '../../services/constants';
import toast from 'react-hot-toast';

const TranslationModal = ({ isOpen, onClose, todo, onTranslationComplete }) => {
  const { translateTodo, translating } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [customLanguage, setCustomLanguage] = useState('');
  const [useCustomLanguage, setUseCustomLanguage] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState(null);
  const [copiedText, setCopiedText] = useState('');

  const handleTranslate = async () => {
    const targetLanguage = useCustomLanguage ? customLanguage : selectedLanguage;
    
    if (!targetLanguage.trim()) {
      toast.error('Please select or enter a language');
      return;
    }

    try {
      const translation = await translateTodo(todo.id, targetLanguage.trim());
      setCurrentTranslation(translation);
      // Notify parent component about the new translation
      if (onTranslationComplete) {
        onTranslationComplete(targetLanguage.trim());
      }
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  const handleCopyText = async (text, type) => {
    try {
      if (!text || typeof text !== 'string') {
        toast.error('No text to copy');
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedText(''), 2000);
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  const handleClose = () => {
    setCurrentTranslation(null);
    setSelectedLanguage('');
    setCustomLanguage('');
    setUseCustomLanguage(false);
    setCopiedText('');
    onClose();
  };

  // Find existing translations for this language
  const existingTranslations = todo.translations || [];
  const currentLanguageTranslation = currentTranslation || 
    existingTranslations.find(t => 
      t.language.toLowerCase() === (useCustomLanguage ? customLanguage : selectedLanguage).toLowerCase()
    );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Translate Todo" size="lg">
      <div className="space-y-6">
        {/* Original todo */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Original Todo</h3>
          <div className="space-y-2">
            <p className="font-medium text-gray-900">{todo.title}</p>
            {todo.description && (
              <p className="text-gray-600 text-sm">{todo.description}</p>
            )}
          </div>
        </div>

        {/* Language selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="preset-language"
              name="languageType"
              checked={!useCustomLanguage}
              onChange={() => setUseCustomLanguage(false)}
              className="text-primary-600"
            />
            <label htmlFor="preset-language" className="text-sm font-medium text-gray-700">
              Choose from common languages
            </label>
          </div>

          {!useCustomLanguage && (
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">Select a language...</option>
              {LANGUAGES.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="custom-language"
              name="languageType"
              checked={useCustomLanguage}
              onChange={() => setUseCustomLanguage(true)}
              className="text-primary-600"
            />
            <label htmlFor="custom-language" className="text-sm font-medium text-gray-700">
              Enter custom language
            </label>
          </div>

          {useCustomLanguage && (
            <Input
              placeholder="Enter any language (e.g., Swahili, Hindi, etc.)"
              value={customLanguage}
              onChange={(e) => setCustomLanguage(e.target.value)}
            />
          )}
        </div>

        {/* Translate button */}
        <Button
          onClick={handleTranslate}
          loading={translating}
          disabled={!selectedLanguage && !customLanguage.trim()}
          icon={<Languages className="w-4 h-4" />}
          className="w-full"
        >
          Translate to {useCustomLanguage ? customLanguage : selectedLanguage}
        </Button>

        {/* Translation result */}
        {currentLanguageTranslation && (
          <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-primary-800">
                Translation ({currentLanguageTranslation.language})
              </h3>
              <div className="text-xs text-primary-600">
                {currentLanguageTranslation.created_at ? new Date(currentLanguageTranslation.created_at).toLocaleDateString() : 'Unknown date'}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-primary-900">
                    {currentLanguageTranslation.translated_title || 'No title available'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyText(currentLanguageTranslation.translated_title, 'title')}
                  icon={copiedText === 'title' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  className="ml-2 text-primary-600"
                />
              </div>
              
              {currentLanguageTranslation.translated_description && (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-primary-800 text-sm">
                      {currentLanguageTranslation.translated_description || 'No description available'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyText(currentLanguageTranslation.translated_description, 'description')}
                    icon={copiedText === 'description' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    className="ml-2 text-primary-600"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Existing translations */}
        {existingTranslations.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Previous Translations ({existingTranslations.length})
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {existingTranslations.map((translation) => (
                <div
                  key={translation.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                >
                  <div>
                    <span className="font-medium">{translation.language || 'Unknown'}</span>
                    <span className="text-gray-500 ml-2">
                      {translation.translated_title || 'No title'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentTranslation(translation)}
                    className="text-primary-600"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TranslationModal; 