<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoteModel extends Model
{
    use Filterable;
    use HasFactory;
    protected $table = "notes";
    protected $fillable = [
        'name',
        'status',
        'date',
      ];
    public function filterName($query, $value)
    {
        return $query->where('name', 'LIKE', '%' . $value . '%');
    }
    public function filterStatus($query, $value)
    {
        return $query->where('status', $value );
    }
    public function filterDate($query, $value)
    {
        return $query->whereDate('date', $value );
    }
    public function filterId($query, $value)
    {
        return $query->where('id', $value );
    }
}
