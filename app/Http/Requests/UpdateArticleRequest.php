<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'summary' => 'required|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published,archived',
            'category_id' => 'required|exists:categories,id',
            'meta_tags' => 'nullable|array',
            'meta_tags.keywords' => 'nullable|array',
            'meta_tags.description' => 'nullable|string|max:160',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Article title is required.',
            'title.max' => 'Article title cannot exceed 255 characters.',
            'summary.required' => 'Article summary is required.',
            'summary.max' => 'Article summary cannot exceed 500 characters.',
            'content.required' => 'Article content is required.',
            'status.required' => 'Article status is required.',
            'status.in' => 'Article status must be draft, published, or archived.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'Selected category does not exist.',
            'meta_tags.description.max' => 'Meta description cannot exceed 160 characters.',
        ];
    }
}