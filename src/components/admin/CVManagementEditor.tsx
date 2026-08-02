import React, { useRef, useState } from 'react';
import { CustomCVData } from '../../types';
import { handleCVDownload } from '../../utils/cvUtils';
import { storageService } from '../../services/storageService';
import {
  FileUp,
  FileCheck,
  Trash2,
  Download,
  CheckCircle2,
  Loader2,
  FileText
} from 'lucide-react';

interface Props {
  customCV: CustomCVData | null;
  onUpdateCV: (cvData: CustomCVData | null) => void;
  userEmail?: string;
}

export const CVManagementEditor: React.FC<Props> = ({ customCV, onUpdateCV, userEmail }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseCVFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);

    // Validate PDF strictly
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMsg('Please select a valid PDF file (.pdf only).');
      if (e.target) e.target.value = '';
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Selected CV file exceeds 8MB size limit. Please choose a smaller PDF file.');
      if (e.target) e.target.value = '';
      return;
    }

    setIsUploading(true);

    try {
      // Execute storage upload (Cloud Storage / DataURL fallback)
      const storageRes = await storageService.uploadFile(file, 'cv-documents');
      
      const newCvData: CustomCVData = {
        fileName: file.name,
        fileType: 'application/pdf',
        dataUrl: storageRes.url,
        updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      };

      onUpdateCV(newCvData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to upload PDF CV file.');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleRemoveCV = () => {
    onUpdateCV(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,application/pdf"
        className="hidden"
      />

      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white font-mono">Curriculum Vitae (CV) Management</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Upload and manage your PDF resume. When visitors click "Download CV" on your portfolio, this exact PDF file will be downloaded directly.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>CV document updated and connected to public portfolio!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-semibold">
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main CV Upload Box */}
      <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-6">
        
        {customCV ? (
          <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900/20 via-[#181818] to-[#181818] border border-blue-500/30 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">
                    Active PDF CV Document
                  </div>
                  <h3 className="text-base font-bold text-white truncate max-w-md mt-0.5">
                    {customCV.fileName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Uploaded on {customCV.updatedAt} {customCV.fileSize && `• ${customCV.fileSize}`}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Connected
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleChooseCVFile}
                disabled={isUploading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FileUp className="w-4 h-4" />
                    <span>Replace CV File</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleCVDownload(customCV, userEmail || 'talhaahmad1379@gmail.com')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-xs border border-white/10 transition-colors"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Test Download</span>
              </button>

              <button
                type="button"
                onClick={handleRemoveCV}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove CV</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 border-2 border-dashed border-white/10 rounded-2xl text-center space-y-4 hover:border-blue-500/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
              <FileText className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-mono">Select & Upload PDF CV</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Choose a PDF resume from your computer. Once uploaded, visitors clicking "Download CV" on the portfolio will download this file.
              </p>
            </div>

            <button
              type="button"
              onClick={handleChooseCVFile}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading PDF...</span>
                </>
              ) : (
                <>
                  <FileUp className="w-4 h-4" />
                  <span>Choose CV File (PDF)</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
