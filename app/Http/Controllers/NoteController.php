<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddNote;
use App\Http\Requests\EditNote;
use App\Http\Requests\IndexNote;
use App\Repositories\Interfaces\NoteRepositoryInterface;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    private $noteRepository;

    public function __construct(NoteRepositoryInterface $noteRepository)
    {
        $this->noteRepository = $noteRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(IndexNote $request)
    {
        $notes = $this->noteRepository->all($request->all());
        return response()->json([
            'status' => 'success',
            'data' => $notes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddNote $request)
    {
        $notes = $this->noteRepository->add($request->all());
        return response()->json([
            'status' => 'success',
            'data' => $notes
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $notes = $this->noteRepository->show($id , $request->all());
        return response()->json([
            'status' => 'success',
            'data' => $notes
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EditNote $request, $id)
    {
        $notes = $this->noteRepository->edit($id , $request->all());
        return response()->json([
            'status' => 'success',
            'data' => $notes
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $notes = $this->noteRepository->delete($id);
        return response()->json([
            'status' => 'success',
            'data' => $notes
        ]);
    }
}
